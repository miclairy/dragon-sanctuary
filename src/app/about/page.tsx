import { alegreya } from '@/app/ui/fonts';

export default function About() {
    return (
        <div className="lg:mx-20 bg-purpleLight p-2 rounded-lg mb-10">
            <div className="mt-4 max-w-3xl h-3xl mx-auto rounded-xl border-dashed border-blue border-2 ">
                <h2 className={`${alegreya.className} text-3xl pb-2 text-purple m-2`}> Queen of the Dragons? </h2>

                <p className="text-lg m-2">
                    Let me introduce myself, Claire Barnaby. Unfortunately I am not the queen of anything just a common
                    software engineer. Officially in my career I develop web apps that scale and add value. This one is
                    built with react and the new, as of 2024, nextjs app router. But really I facilitate human computer
                    interaction by building software to make our life easier and more fun. Which really means I use my 5
                    years of experience to collaborate with product and design to solve problems.
                </p>

                <div className="m-4">
                    <h3 className="my-2"> Follow me around the web: </h3>
                    <ul className=" mx-4 text-pinkDark font-semibold underline list-disc">
                        <li>
                            <a href="https://github.com/miclairy"> Github </a>
                        </li>

                        <li>
                            <a href="https://www.linkedin.com/in/clairebarnaby/"> LinkedIn </a>
                        </li>
                    </ul>
                </div>
                <div className="m-2 italic">
                    <p>PS: The rainbow is all CSS 🙊 </p>
                    <p>
                        PPS: Contrary to popular belief I made the backdrop svgs on the home page and wrote the copy
                        without the help of a certain AI ☺️
                    </p>
                </div>
            </div>
        </div>
    );
}