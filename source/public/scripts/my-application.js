export default function initMyApplication(initialModel, root, App) {
    
    const registeredEvents = [];

    const myApplicationContext = { model: { ...initialModel } }; 

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

    myApplicationContext.updateModel = (updated) => {
        myApplicationContext.model = { ...myApplicationContext.model, ...updated };
        render();
    }

    return myApplicationContext;
}