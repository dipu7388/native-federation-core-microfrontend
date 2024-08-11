import * as rxjs from 'rxjs';
import * as sharedLib  from 'shared-lib';

import { loadRemoteModule } from '@softarc/native-federation';

const container = document.getElementById('container');
const flightsLink = document.getElementById('flights');
const adminLink = document.getElementById('admin');
const reactLink = document.getElementById('react');
const homeLink = document.getElementById('home');

function removeFirstChild() {
    if (container.firstChild) {
        container.firstChild.remove();
    }
}

function displayWelcomeMessage() {
    removeFirstChild();
    container.innerHTML = `<h1>Welcome!</h1>`;
}

(async function() { 
   
    sharedLib.setData('Hello from the Shell!');

    displayWelcomeMessage();

    rxjs.fromEvent(flightsLink, 'click').subscribe(async _ => {
        
        const module = await loadRemoteModule({
            remoteName: 'mfe1',
            exposedModule: './component'
        });
        
        const elm = document.createElement(module.elementName);
        removeFirstChild();       
        container.appendChild(elm);
    });

    rxjs.fromEvent(adminLink, 'click').subscribe(async _ => {
      const elm1 = document.createElement('app-root');
      removeFirstChild();
      container.appendChild(elm1);
        
        const module = await loadRemoteModule({
            exposedModule: './Component',
            remoteEntry: 'http://localhost:4201/remoteEntry.json',
            remoteName: 'admin'
        });

      const elm = document.createElement('app-component');
      removeFirstChild();
      container.appendChild(elm);
    });

    rxjs.fromEvent(reactLink, 'click').subscribe(async _ => {
          
          const module = await loadRemoteModule({
              exposedModule: './component-react',
              remoteEntry: 'http://localhost:3101/remoteEntry.json',
              remoteName: 'react-mfe1'
          });
  
        const elm = document.createElement('react-mf1');
        removeFirstChild();
        container.appendChild(elm);
      });

    rxjs.fromEvent(homeLink, 'click').subscribe(_ => {
        displayWelcomeMessage();
    })

})();