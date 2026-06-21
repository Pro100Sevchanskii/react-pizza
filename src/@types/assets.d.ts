// 1. Графика и изображения (Импортируются как строка/путь к файлу)
declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.avif' {
    const src: string;
    export default src;
}

// 2. SVG (Двойной импорт: как путь к файлу ИЛИ как React-компонент)
declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >;

    const src: string;
    export default src;
}

// 3. CSS и SCSS Модули (Со строгой типизацией классов)
declare module '*.module.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.module.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.module.sass' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

// 4. Глобальные стили (Простая заглушка без типизации классов)
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
