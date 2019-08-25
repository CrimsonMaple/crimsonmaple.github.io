// Hack init variables
var date_global = new Date();
var hours;
var minutes;

function check_times_gracies() {
    switch (hours) {
        default:
        // Gracies is closed
            return 0;
            break;
        case 6:
            // Gracies opens in 10 minutes.
                if (minutes == 50)
                    return 2;
            break;
        case 7:
            // Gracies opens.
                return 1;
            break;
        case 8:
                return 1;
            break;
        case 9:
                return 1;
            break;
        case 10:
                return 1;
            break;
        case 11:
                return 1;
            break;
        case 12:
            return 1;
            break;
        case 13:
                return 1;
            break;
        case 14:
                return 1;
            break;
        case 15:
                return 1;
            break;
        case 16:
                return 1;
            break;
        case 17:
                return 1;
            break;
        case 18:
                return 1;
            break;
        case 19:
                if (minutes < 30) {
                    // Gracies is closing in 10 mins.
                    if (minutes == 20)
                        return 3;
                } else
                    return 0;
            break;
    }
}

function check_times_cstore() {
    switch (hours) {
        default:
        // Corner is closed
            return 0;
            break;
        case 7:
            // Corner opens in 10 minutes on a weekday.
                if ((date_global.getDay != 0 || date_global.getDay != 6) && date_global.getMinutes == 50)
                    return 2;
                else
                    return 0;
            break;
        case 8:
                if (date_global.getDay != 0 || date_global.getDay != 6)
                    return 1;
                else
                    return 0;
            break;
        case 9:
                if (date_global.getDay != 0 || date_global.getDay != 6)
                    return 1;
            break;
        case 10:
                if (date_global.getDay == 0 || date_global.getDay == 6) {
                    if (date_global.getMinutes < 30) {
                        // Corner is opening in 10 mins.
                        if (date_global.getMinutes == 20)
                            return 2;
                    }
                }
            break;
        case 11:
                return 1;
            break;
        case 12:
                return 1;
            break;
        case 13:
                return 1;
            break;
        case 14:
                return 1;
            break;
        case 15:
                return 1;
            break;
        case 16:
                return 1;
            break;
        case 17:
                return 1;
            break;
        case 18:
                return 1;
            break;
        case 19:
                return 1;
            break;
        case 20:
                return 1;
            break;
        case 21:
                return 1;
            break;
        case 22:
                return 1;
            break;
        case 23:
            // Corner is closing in 10 mins.
            if (minutes == 50)
                return 3;
            break;
    }
}

function check_times_sol() {
    switch (hours) {
        default:
        // Gracies is closed
            return 0;
        break;
        case 10:
            // Sol opens in 10 minutes.
                if (minutes == 50)
                    return 2;
            break;
        case 11:
                return 1;
            break;
        case 12:
                return 1;
            break;
        case 13:
                return 1;
            break;
        case 14:
                return 1;
            break;
        case 15:
                return 1;
            break;
        case 16:
                return 1;
            break;
        case 17:
                return 1;
            break;
        case 18:
                return 1;
            break;
        case 19:
                return 1;
            break;
        case 20:
                if (minutes == 50)
                    return 3;
                else
                    return 1;
            break;
    }
}

function opened() {
    hours = 12;
}

function closed() {
    hours = 2;
}

function most_closed() {
    hours = 23;
    minutes = 50;
}

function get_real_time() {
    hours = date_global.getHours();
    minutes = date_global.getMinutes();
}

function check_thing() {
    if (check_times_gracies() == 0) {
        document.getElementById("demo").innerHTML = "<h1>Gracie's is closed.</h1>";
    }
    if (check_times_gracies() == 1) {
        document.getElementById("demo").innerHTML = "<h1>Gracie's is open.</h1>";
    }
    if (check_times_gracies() == 2) {
        // Todo: Make this a notification
        document.getElementById("demo").innerHTML = "<h1>Gracie's is almost open.</h1>";
    }
    if (check_times_gracies() == 3) {
        // Todo: make this a notification
        document.getElementById("demo").innerHTML = "<h1>Gracie's is almost closed.</h1>";
    }

    // --------------------------------------------------------------------------------------------------------
    if (check_times_cstore() == 0) {
        document.getElementById("demo2").innerHTML = "<h1>Corner Store is closed.</h1>";
    }
    if (check_times_cstore() == 1) {
        document.getElementById("demo2").innerHTML = "<h1>Corner Store is open.</h1>";
    }
    if (check_times_cstore() == 2) {
        // Todo: Make this a notification
        document.getElementById("demo2").innerHTML = "<h1>Corner Store is almost open.</h1>";
    }
    if (check_times_cstore() == 3) {
        // Todo: make this a notification
        document.getElementById("demo2").innerHTML = "<h1>Corner Store is almost closed.</h1>";
    }


    // --------------------------------------------------------------------------------------------------------
    if (check_times_sol() == 0) {
        document.getElementById("demo3").innerHTML = "<h1>Sol's is closed.</h1>";
    }
    if (check_times_sol() == 1) {
        document.getElementById("demo3").innerHTML = "<h1>Sol's is open.</h1>";
    }
    if (check_times_sol() == 2) {
        // Todo: Make this a notification
        document.getElementById("demo3").innerHTML = "<h1>Sol's is almost open.</h1>";
    }
    if (check_times_sol() == 3) {
        // Todo: make this a notification
        document.getElementById("demo3").innerHTML = "<h1>Sol's is almost closed.</h1>";
    }
}