// http://stackoverflow.com/a/10073788
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// modified from http://stackoverflow.com/a/8212878
function millisecondsToStr (milliseconds) {
    // TIP: to find current time in milliseconds, use:
    // var  current_time_milliseconds = new Date().getTime();

    function numberEnding (number) {
        return (number > 1) ? 's' : '';
    }

    var temp = Math.floor(milliseconds / 1000);
    var parts = [];
    //TODO: Months! Maybe weeks? 
    var days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
        parts.push(days + 'd');
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    if (days || hours) {
        parts.push(pad(hours, 2));
    }
    var minutes = Math.floor((temp %= 3600) / 60);
    if (days || hours || minutes) {
        parts.push(pad(minutes, 2));
    }
    var seconds = temp % 60;
    if (days || hours || minutes || seconds) {
        parts.push(pad(seconds, 2));
    }
    return parts.join(":");
}
