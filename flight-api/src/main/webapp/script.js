window.onload = () => {

    class FlightList {
        constructor(flights) {
            this.flights = []
        }

        getFlights() {
            return this.flights
        }
        setFlights(flights) {
            this.flights = flights
        }
        append(flight) {
            this.flights.push(flight)
        }
    }
    
    const flightlist = new FlightList
    let filter = ''

    let isEditing = false
    let editId = null
    
    
    
//     ____  _______   ______  __________ 
//    / __ \/ ____/ | / / __ \/ ____/ __ \
//   / /_/ / __/ /  |/ / / / / __/ / /_/ /
//  / _, _/ /___/ /|  / /_/ / /___/ _, _/ 
// /_/ |_/_____/_/ |_/_____/_____/_/ |_|  

    const render = () => {
        const flights = flightlist.getFlights().filter(flight => flight.id.toString().startsWith(filter))

        if (isEditing) {
            const btn = document.getElementById('btn-form')
            btn.className = 'btn btn-success mt-4'
            btn.setAttribute('value', 'Edit')
            document.getElementById('btn-cancel').style.display = ''
        } else {
            const btn = document.getElementById('btn-form')
            btn.className = 'btn btn-primary mt-4'
            btn.setAttribute('value', 'Add')
            document.getElementById('btn-cancel').style.display = 'none'
        }

        const table = document.getElementById('flight-table')
        while (table.firstChild) {
            table.removeChild(table.lastChild)
        }
        for (const flight of flights) {
            const {id, maxNumPassengers, numPassengers, flightNumber, fromAirport, toAirport, departureTime, arrivalTime} = flight
            
            const el_tr = document.createElement("tr")
            if (id == editId && isEditing) {
                el_tr.className = 'table-success'
            } else {
                el_tr.className = ''
            }

            el_tr.id = id

            const html = `
            <th scope="row">${id}</th>
            <td>${maxNumPassengers}</td>
            <td>${numPassengers}</td>
            <td>${flightNumber}</td>
            <td>${fromAirport}</td>
            <td>${toAirport}</td>
            <td>${new Date(departureTime).toISOString().slice(0,10)}</td>
            <td>${new Date(arrivalTime).toISOString().slice(0,10)}</td>
            <div class="btn-group" role="group">
                <button class="btn btn-success" id="btn-edit">
                    <i class="far fa-edit" id="btn-edit" aria-hidden="false"></i>
                </button>
                <button class="btn btn-danger" id="btn-delete">
                    <i class="far fa-trash-alt" id="btn-delete" aria-hidden="false"></i>
                </button>
            </div>
            `
            
            el_tr.insertAdjacentHTML('beforeend', html)
            
            table.appendChild(el_tr)

        }
    }

// END RENDER



//     ___________   ______     ___    __    __ 
//    / ____/  _/ | / / __ \   /   |  / /   / / 
//   / /_   / //  |/ / / / /  / /| | / /   / /  
//  / __/ _/ // /|  / /_/ /  / ___ |/ /___/ /___
// /_/   /___/_/ |_/_____/  /_/  |_/_____/_____/ (on load only)

    let xhr = new XMLHttpRequest;
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            const flights = JSON.parse(xhr.responseText)
            for (const flight of flights) {
                flightlist.append(flight)
            }
            render()
        }
    }
    xhr.open('GET', '/flight-api/api/flights')
    xhr.send()
    
// END FIND ALL

    
    

//     ____  ____  ___________      __   __________  __________
//    / __ \/ __ \/ ___/_  __/    _/_/  / ____/ __ \/  _/_  __/
//   / /_/ / / / /\__ \ / /     _/_/   / __/ / / / // /  / /   
//  / ____/ /_/ /___/ // /    _/_/    / /___/ /_/ // /  / /    
// /_/    \____//____//_/    /_/     /_____/_____/___/ /_/     
                                                            
    document.getElementById('flight-form').addEventListener('submit', e => {
        e.preventDefault()
        const maxNumPassengers = document.getElementById('maxNumPassengers').value
        const numPassengers = document.getElementById('numPassengers').value
        const flightNumber = document.getElementById('flightNumber').value
        const fromAirport = document.getElementById('fromAirport').value
        const toAirport = document.getElementById('toAirport').value
        const departureTime = new Date(document.getElementById('departureTime').value).toUTCString()
        const arrivalTime = new Date(document.getElementById('arrivalTime').value).toUTCString()
        
        const flight = {maxNumPassengers, numPassengers, flightNumber, fromAirport, toAirport, departureTime, arrivalTime}
        
        if (isEditing) {
            const editFlight = {...flight, id: editId}
            let xhr = new XMLHttpRequest
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    const flights = flightlist.getFlights()
                    const idx = flights.findIndex(flight => flight.id == editId)
                    flights[idx] = editFlight
                    flightlist.setFlights(flights)
                    isEditing = false
                    render()
                }
            }
            
            xhr.open('PUT', '/flight-api/api/flight')
            xhr.send(JSON.stringify(editFlight))
        } else {
            let xhr = new XMLHttpRequest
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    respFlight = JSON.parse(xhr.responseText)
                    flightlist.setFlights([...flightlist.getFlights(), respFlight])
                    render()
                    console.log(respFlight);
                }
            }
            
            xhr.open('POST', '/flight-api/api/flight')
            xhr.send(JSON.stringify(flight))
        }
        
        document.getElementById('flight-form').reset()
    })
    
// END POST / EDIT
    



//     __________  __________      __   ____  ________    __________________   ____  _________ ____  ___  ______________  ____________ 
//    / ____/ __ \/  _/_  __/    _/_/  / __ \/ ____/ /   / ____/_  __/ ____/  / __ \/  _/ ___// __ \/   |/_  __/ ____/ / / / ____/ __ \
//   / __/ / / / // /  / /     _/_/   / / / / __/ / /   / __/   / / / __/    / / / // / \__ \/ /_/ / /| | / / / /   / /_/ / __/ / /_/ /
//  / /___/ /_/ // /  / /    _/_/    / /_/ / /___/ /___/ /___  / / / /___   / /_/ // / ___/ / ____/ ___ |/ / / /___/ __  / /___/ _, _/ 
// /_____/_____/___/ /_/    /_/     /_____/_____/_____/_____/ /_/ /_____/  /_____/___//____/_/   /_/  |_/_/  \____/_/ /_/_____/_/ |_|  

    document.getElementById('flight-table').addEventListener('click', e => {
        if (e.target.id === 'btn-edit') {
            
            const tr = e.target.closest('tr')
            const cols = tr.children

            const id = cols[0].innerText
            const maxNumPassengers = cols[1].innerText
            const numPassengers = cols[2].innerText
            const flightNumber = cols[3].innerText
            const fromAirport = cols[4].innerText
            const toAirport = cols[5].innerText
            const departureTime = cols[6].innerText
            const arrivalTime = cols[7].innerText
            
            const flight = {id, maxNumPassengers, numPassengers, flightNumber, fromAirport, toAirport, departureTime, arrivalTime}
            editFlight(flight)
        }

        else if (e.target.id === 'btn-delete') {
            isEditing = false
            document.getElementById('flight-form').reset()
            const tr = e.target.closest('tr')
            const id = tr.children[0].innerText
            const flightId = {id}
            deleteFlight(flightId)
        }

    })  
    
    // END EDIT / DELETE DISPATCHER   



//     ____  ________    __________________
//    / __ \/ ____/ /   / ____/_  __/ ____/
//   / / / / __/ / /   / __/   / / / __/   
//  / /_/ / /___/ /___/ /___  / / / /___   
// /_____/_____/_____/_____/ /_/ /_____/   
                                        
    const deleteFlight = flightId => {
        let xhr = new XMLHttpRequest
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                flightlist.setFlights(flightlist.getFlights().filter(flight => flight.id != flightId.id))
                render()
            }
        }

        xhr.open('DELETE', '/flight-api/api/flight')
        xhr.send(JSON.stringify(flightId))
    }

    // END DELETE




//     __________  __________
//    / ____/ __ \/  _/_  __/
//   / __/ / / / // /  / /   
//  / /___/ /_/ // /  / /    
// /_____/_____/___/ /_/     
                          
    const editFlight = flight => {
        isEditing = true
        editId = flight.id
        render()

        document.getElementById('maxNumPassengers').value = flight.maxNumPassengers
        document.getElementById('numPassengers').value = flight.numPassengers
        document.getElementById('flightNumber').value = flight.flightNumber
        document.getElementById('fromAirport').value = flight.fromAirport
        document.getElementById('toAirport').value = flight.toAirport
        document.getElementById('departureTime').value = flight.departureTime
        document.getElementById('arrivalTime').value = flight.arrivalTime
    }

    // END EDIT

    document.getElementById('search').addEventListener('input', e => {
        filter = document.getElementById('search').value.toString()
        render()
    })
}