//约束组件开发者
export interface Icomponents {
    temContainer: HTMLElement;
    init: ()=>void;
    template:()=>void;
    handle:()=>void;
}
