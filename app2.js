const loadUniverse = () => {
    fetch("https://openapi.programming-hero.com/api/ai/tools")
        .then(res => res.json())
        .then(data=>{
            // console.log(data)
            showUniverse(data.data.tools.slice(0,6));
        })
        
    }
    //show universe
    const showUniverse = (universes) => {
        // console.log(universes);
    
        const universeContainer = document.getElementById("universe-container");
        universeContainer.innerHTML = '';
          
        //get single universe with forEach
            universes.forEach(universe => {
            // console.log(universe)
            //create a div and set innerHTML
            const universeDiv = document.createElement("div");
            universeDiv.classList.add("col");
            universeDiv.innerHTML = `
            <div class="card h-100">
            <img class= "mx-3 my-3" src="${universe.image}" class="card-img-top" alt="...">
            
            <div class="card-body">
              <h5 class="card-title">Features</h5>
              <ol class="list-group list-group-numbered">
            <li class="list-group-item">${universe.features[0]}</li>
           <li class="list-group-item">${universe.features[1]}</li>
          <li class="list-group-item">${universe.features[2]}</li>
          </ol>
          </div>
    
            <div class="card-footer">
            <h3> ${universe.name}</h3>
            <p>${universe.published_in}</p>
              <div class="text-end">
            <button onClick="showUniverseInfo('${universe.id}')" class=" btn btn-outline-primary text-left" data-bs-toggle="modal" data-bs-target="#universeDetailModal">&rightarrow;</button>
             </div>
             </div>
    
          </div>
            `;
            universeContainer.appendChild(universeDiv);
        });
    }
    
    //show more universe card when will click see all button
    const showAllUniverse = () =>{
      fetch(" https://openapi.programming-hero.com/api/ai/tools")
        .then(res => res.json())
        .then (data =>showUniverse (data.data.tools) )
    }

    //show universe details in the modal
    const showUniverseInfo = (id) => {
          const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
          fetch(url)
          .then(res => res.json())
          .then(data=> showDetails(data.data))
    }

    const showDetails = universe =>{
      // console.log(universe)
      //modal card one details
      document.getElementById("universe-description").innerText = universe.description;

      const priceContainer= document.getElementById("pricing")
      priceContainer.innerHTML = ''
      const prices = universe.pricing;
        prices.map(price=> {
          // console.log(price)
          priceContainer.innerHTML +=`
               <div  style="width:120px; height: 100px;" class="border d-grid justify-content-center align-items-center rounded-3 bg-white">${price.price}  ${price.plan} </div>
          `
        })
        //show features in card one
        const getModalFeaturesContainer = document.getElementById("card-feature");
        getModalFeaturesContainer.innerHTML = `
        <h3>Features</h3>
        <ul>
        <li>${universe.features[1].feature_name}</li>
       <li>${universe.features[2].feature_name}</li>
      <li>${universe.features[3].feature_name}</li>
      </ul>
        `
        //show integrations in card one
        const integrationsContainer = document.getElementById("card-integrations");
        integrationsContainer.innerHTML = `
        <h3>integrations</h3>
        <ul>
        <li>${universe.integrations[0]? universe.integrations[0] : "no data found" }</li>
       <li>${universe.integrations[1] ? universe.integrations[1] : "no data found"}  </li>
      <li>${universe.integrations[2] ? universe.integrations[2] : "no data found"}</li>
      </ul>
        `
        console.log(universe)
      //modal card 2 details
      const modalCard2 = document.getElementById("modal-card-2");
      modalCard2.innerHTML =  `
      <span style="width:40px; top:20px; right:20px; margin-left:20px;" class="badge rounded-pill text-bg-danger position-absolute">${universe.accuracy.score!=null? universe.accuracy.score : ""}</span>
      <img class="mx-2 my-2" src="${universe.image_link[0]}" >
      <h5 class="mx-2">${universe.input_output_examples[1].input}</h5>
      <p class="mx-2">${universe.input_output_examples[1] != null ? universe.input_output_examples[1].output : "No! Not Yet! Take a break!!!"  }</p>
      
      `
    }
    loadUniverse()