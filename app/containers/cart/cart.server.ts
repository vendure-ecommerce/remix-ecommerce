import { json, redirect } from "remix";
import type { ActionFunction, HeadersFunction, LoaderFunction } from "remix";

import commerce from "~/commerce.server";
import type { CartInfo } from "~/models/ecommerce-provider.server";
import { updateCartItem, removeCartItem, getSession } from "~/session.server";
import { getTranslations, PickTranslations } from "~/translations.server";

export let headers: HeadersFunction = ({ actionHeaders }) => {
  return actionHeaders;
};

export let action: ActionFunction = async ({ request, params }) => {
  let [body, session] = await Promise.all([
    request.text(),
    getSession(request, params),
  ]);

  let formData = new URLSearchParams(body);
  let action = formData.get("_action");
  console.log(Array.from(formData));

  try {
    let cart = await session.getCart();

    switch (action) {
      case "set-quantity": {
        let variantId = formData.get("variantId");
        let quantityStr = formData.get("quantity");
        if (!variantId || !quantityStr) {
          break;
        }
        let quantity = Number.parseInt(quantityStr, 10);
        cart = updateCartItem(cart, variantId, quantity);
        break;
      }
      case "delete": {
        let variantId = formData.get("variantId");
        if (!variantId) {
          break;
        }
        cart = removeCartItem(cart, variantId);
        break;
      }
    }

    await session.setCart(cart);
    return json(null, {
      headers: {
        "Set-Cookie": await session.commitSession(),
      },
    });
  } catch (error) {
    console.error(error);
  }

  return null;
};

export type LoaderData = {
  cart?: CartInfo;
  translations: PickTranslations<
    | "Cart"
    | "Add item"
    | "Remove from cart"
    | "Subtract item"
    | "Quantity: $1"
    | "Your cart is empty"
    | "Subtotal"
    | "Taxes"
    | "Shipping"
    | "Total"
    | "Proceed to checkout"
  >;
};

export let loader: LoaderFunction = async ({ request, params }) => {
  let session = await getSession(request, params);
  let lang = session.getLanguage();
  let cart = await session
    .getCart()
    .then((cartItems) => commerce.getCartInfo(lang, cartItems));

  return json<LoaderData>({
    cart,
    translations: getTranslations(lang, [
      "Cart",
      "Add item",
      "Remove from cart",
      "Subtract item",
      "Quantity: $1",
      "Your cart is empty",
      "Subtotal",
      "Taxes",
      "Shipping",
      "Total",
      "Proceed to checkout",
    ]),
  });
};
