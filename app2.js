const loadUniverse = () => {
    fetch(" https://openapi.programming-hero.com/api/ai/tools")
        .then(res => res.json())
        .then(data=>{
            console.log(data)
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
            console.log(universe.published_in)
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
            <button class=" btn btn-primary text-left" data-bs-toggle="modal" data-bs-target="#universeDetailModal">More Info</button>
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
    
    loadUniverse()