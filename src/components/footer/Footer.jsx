import React from "react";

const Footer = () => {
    const authorClass = "text-gray-500 hover:text-gray-700 text-sm";
    return (
        <footer className="py-6 bg-sky-100">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-wrap items-center justify-between">
                    <a
                        href="https://github.com/praca-inz-pjjj"
                        className="text-center text-gray-500 hover:text-gray-700 text-sm mt-4 md:mt-0"
                    >
                        Projekt Inżynierski 2024-2025
                    </a>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <a
                            href="https://github.com/pwolan"
                            className={authorClass}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Piotr Wolanin
                        </a>
                        <a
                            href="https://github.com/KubaBiz"
                            className={authorClass}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Jakub Bizan
                        </a>
                        <a
                            href="https://github.com/jkr02"
                            className={authorClass}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Jakub Kroczek
                        </a>
                        <a
                            href="https://github.com/jaugustyn02"
                            className={authorClass}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Jan Augustyn
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
