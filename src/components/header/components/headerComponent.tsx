type HeaderProps = {
    title: string;
    subtitle: string;
};

export const HeaderComponent = ({ title, subtitle }: HeaderProps) => {
    return (
        <header className="bg-gray-700 text-white shadow-md rounded-xl">
            <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
                    <p className="text-sm text-gray-400">{subtitle}</p>
                </div>

                <nav>
                    <ul className="flex flex-wrap items-center gap-6 text-sm font-medium">
                        <li>
                            <a
                                href="/"
                                className="hover:text-blue-400 transition-colors duration-200"
                            >
                                Todo List
                            </a>
                        </li>
                        <li>
                            <a
                                href="/create-todo"
                                className="hover:text-blue-400 transition-colors duration-200"
                            >
                                Create Todo
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};