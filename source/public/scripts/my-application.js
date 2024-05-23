export default function initMyApplication(initialModel, root, App) {
    
    let model = { ...initialModel };
    const registeredEvents = [];

    const myApplicationContext = { model }; 

    const render = () => {

        const { events, template } = App(myApplicationContext);
        
        registeredEvents.forEach(({ selector, ev, handler }) => {
            const target = root.querySelector(selector);
            if (target) target.removeEventListener(ev, handler);
        });

        root.innerHTML = template(model);
        
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
        model = { ...model, ...updated };
        render();
    }

    return myApplicationContext;
}