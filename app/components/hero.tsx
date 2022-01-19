import heroHref from '~/images/remix-vendure.webp';

export function Hero() {
    return (
        <div style={{backgroundColor: '#212121'}}>
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row">
                <div className='flex justify-center'>
                    <img
                        src={heroHref}
                        alt=""
                    />
                </div>
                <div className='flex justify-center items-center'>
                    <div className='lg:pl-6 mb-6'>
                        <h2 className="text-lg lg:text-4xl font-light lg:mt-12">Open-source headless commerce</h2>
                        <p className='lg:text-xl my-2'>Built with <a href='https://remix.run/'
                                                                     className='text-blue-300 hover:text-blue-500'>Remix</a> & <a
                            href='https://www.vendure.io/' className='text-blue-300 hover:text-blue-500'>Vendure</a></p>
                        <a href='https://github.com/vendure-ecommerce/remix-ecommerce' className='text-blue-300 hover:text-blue-500'>github.com/vendure-ecommerce/remix-ecommerce</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
