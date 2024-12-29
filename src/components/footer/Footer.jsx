import React from "react";

const Footer = () => {
    const authorClass = "text-gray-500 hover:text-gray-700 text-sm text-center";
    return (
        <footer className="py-8 bg-sky-100">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                    <a
                        href="https://github.com/praca-inz-pjjj"
                        className="text-center text-gray-500 hover:text-gray-700 text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Projekt Inżynierski 2024-2025
                    </a>
                    <div className="flex flex-wrap justify-center gap-2 mt-4 sm:mt-0">
                        <div className="ml-2">
                            <p className="text-gray-700 text-sm text-center">Autorzy:</p>
                        </div>
                        <div className="flex justify-center gap-4 sm:gap-2 w-full sm:w-auto">
                            <a
                                href="https://github.com/jaugustyn02"
                                className={authorClass}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Jan Augustyn
                            </a>
                            <a
                                href="https://github.com/KubaBiz"
                                className={authorClass}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Jakub Bizan
                            </a>
                        </div>
                        <div className="flex justify-center gap-4 sm:gap-2 w-full sm:w-auto">
                            <a
                                href="https://github.com/jkr02"
                                className={authorClass}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Jakub Kroczek
                            </a>
                            <a
                                href="https://github.com/pwolan"
                                className={authorClass}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Piotr Wolanin
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
