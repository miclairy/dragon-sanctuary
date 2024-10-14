export default function About() {
    return (
        <div className="lg:mx-20 bg-purpleLight p-2 rounded-lg mb-10">
            <h2 className="text-2xl pb-2"> Queen of the dragons? </h2>
            <p className="text-lg">
                Unfortunately not. This site was created by Claire Barnaby, a software engineer. She has 5 years of full
                stack experience and wrote this to learn about the nextjs app router.
            </p>

            <h3 className="mt-2"> Links: </h3>
            <ul className="text-pink">
                <li className="px-2">
                    <a href="https://github.com/miclairy"> Github </a>
                </li>

                <li className="px-2">
                    <a href="https://www.linkedin.com/in/clairebarnaby/"> LinkedIn </a>
                </li>
            </ul>
        </div>
    );
}
