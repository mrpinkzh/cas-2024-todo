export default function initMyApplication(model, rootSelector, App) {
    
    const root = document.querySelector(rootSelector)
    const registeredEvents = [];

    const myApplicationContext = { model, render: () => {} }; 

    const render = () => {

        const { events, template } = App(myApplicationContext);
        
        registeredEvents.forEach(({ selector, ev, handler }) => {
            const target = root.querySelector(selector);
            if (target) target.removeEventListener(ev, handler);
        });

        root.innerHTML = template(myApplicationContext.model);
        
        events.forEach(({ selector, ev, handler }) => {
            const target = root.querySelector(selector);
            if (target) {
                target.addEventListener(ev, handler);
                registeredEvents.push({ selector, ev, handler });
            }
        }); 
    }

    myApplicationContext.render = render;

    return myApplicationContext;
}