// Your code here

let createEmployeeRecord  = function (details) {
    return {
        firstName: details[0],
        familyName: details[1],
        title: details[2],
        payPerHour: details[3],
        timeInEvents: [],
        timeOutEvents: []

    }
}

let createEmployeeRecords = function(employeeData) {
    return employeeData.map(function(details){
        return createEmployeeRecord(details)
    })
}


let createTimeInEvent = function(theEmployee, dateStamped){
    let [date, hour] = dateStamped.split(' ')

    theEmployee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return theEmployee
}



let createTimeOutEvent = function(theEmployee, dateStamped){
    let [date, hour] = dateStamped.split(' ')

    theEmployee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return theEmployee
}


let hoursWorkedOnDate = function(theEmployee, soughtDate){
    let inEvent = theEmployee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })

    let outEvent = theEmployee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}



let wagesEarnedOnDate = function(theEmployee, dateSought){
    let rawWage = hoursWorkedOnDate(theEmployee, dateSought)
        * theEmployee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}


let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }


  let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}
