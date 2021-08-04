window.onload = () => {

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
        
        let xhr = new XMLHttpRequest
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                respFlight = JSON.parse(xhr.responseText)
                console.log(respFlight);
            }
        }
        
        xhr.open('POST', '/flight-api/api/flight')
        xhr.send(JSON.stringify(flight))
        
        document.getElementById('flight-form').reset()
    })

    let xhr = new XMLHttpRequest;
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            flights = JSON.parse(xhr.responseText)
            flights.forEach(flight => {
                appendFlightToTable(flight)
            });
        }
    }
    xhr.open('GET', '/flight-api/api/flights')
    xhr.send()
    
    appendFlightToTable = flight => {
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
        el_delIcon.className = 'far fa-trash-alt'
        
        el_editBtn.className = 'btn btn-primary'
        el_delBtn.className = 'btn btn-danger'
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

        document.getElementById('flight-table').appendChild(el_tr)
    }
}
