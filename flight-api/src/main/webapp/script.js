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
    const filteredFlightlist = new FlightList

    let isEditing = false
    let editId = null
    
    
    
//     ____  _______   ______  __________ 
//    / __ \/ ____/ | / / __ \/ ____/ __ \
//   / /_/ / __/ /  |/ / / / / __/ / /_/ /
//  / _, _/ /___/ /|  / /_/ / /___/ _, _/ 
// /_/ |_/_____/_/ |_/_____/_____/_/ |_|  

    const render = flights => {
        if (isEditing) {
            const btn = document.getElementById('btn-form')
            btn.className = 'btn btn-success mt-4'
            btn.setAttribute('value', 'Edit')
        } else {
            const btn = document.getElementById('btn-form')
            btn.className = 'btn btn-primary mt-4'
            btn.setAttribute('value', 'Submit')
        }
        const table = document.getElementById('flight-table')
        while (table.firstChild) {
            table.removeChild(table.lastChild)
        }
        for (const flight of flights) {
            const el_tr = document.createElement("tr")
            const el_id = document.createElement("th")
            const el_maxNumPassengers = document.createElement("td")
            const el_numPassengers = document.createElement("td")
            const el_flightNumber = document.createElement("td")
            const el_fromAirport = document.createElement("td")
            const el_toAirport = document.createElement("td")
            const el_departureTime = document.createElement("td")
            const el_arrivalTime = document.createElement("td")
            
            const el_btnGroup = document.createElement('div')
            const el_editBtn = document.createElement('button')
            const el_delBtn = document.createElement('button')
            const el_editIcon = document.createElement('i')
            const el_delIcon = document.createElement('i')
            
            const {id, maxNumPassengers, numPassengers, flightNumber, fromAirport, toAirport, departureTime, arrivalTime} = flight
            
            el_id.innerText = id
            el_maxNumPassengers.innerText = maxNumPassengers
            el_numPassengers.innerText = numPassengers
            el_flightNumber.innerText = flightNumber
            el_fromAirport.innerText = fromAirport
            el_toAirport.innerText = toAirport
            el_departureTime.innerText = departureTime
            el_arrivalTime.innerText = arrivalTime
            
            el_id.scope = 'row'
            
            el_editIcon.className = 'far fa-edit'
            el_editIcon.id = 'btn-edit'
            el_delIcon.className = 'far fa-trash-alt'
            el_delIcon.id = 'btn-delete'
            
            el_editBtn.className = 'btn btn-primary'
            el_delBtn.className = 'btn btn-danger'
            el_delBtn.id = 'btn-delete'
            el_editBtn.id = 'btn-edit'
            el_editBtn.appendChild(el_editIcon)
            el_delBtn.appendChild(el_delIcon)
            
            el_btnGroup.className = 'btn-group'
            el_btnGroup.setAttribute('role', 'group')
            el_btnGroup.appendChild(el_editBtn)
            el_btnGroup.appendChild(el_delBtn)
            
            el_tr.appendChild(el_id)
            el_tr.appendChild(el_maxNumPassengers)
            el_tr.appendChild(el_numPassengers)
            el_tr.appendChild(el_flightNumber)
            el_tr.appendChild(el_fromAirport)
            el_tr.appendChild(el_toAirport)
            el_tr.appendChild(el_departureTime)
            el_tr.appendChild(el_arrivalTime)
            el_tr.appendChild(el_btnGroup)
            
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
            filteredFlightlist.setFlights(flightlist.getFlights())
            render(flightlist.getFlights())
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
        const departureTime = document.getElementById('departureTime').value
        const arrivalTime = document.getElementById('arrivalTime').value
        
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
                    render(flightlist.getFlights())
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
                    render(flightlist.getFlights())
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
            const id = tr.firstChild.innerText
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
                console.log(flightlist.getFlights());
                render(flightlist.getFlights())
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
        render(flightlist.getFlights())

        document.getElementById('maxNumPassengers').value = flight.maxNumPassengers
        document.getElementById('numPassengers').value = flight.numPassengers
        document.getElementById('flightNumber').value = flight.flightNumber
        document.getElementById('fromAirport').value = flight.fromAirport
        document.getElementById('toAirport').value = flight.toAirport
        document.getElementById('departureTime').value = flight.departureTime
        document.getElementById('arrivalTime').value = flight.arrivalTime
    }

    // END EDIT
}
    