const intentos = {};

function checkIntentos(ip) {
  if (!intentos[ip]) {
    intentos[ip] = {
      count: 1,
      firstAttempt: Date.now()
    };
    return true;
  }
  
  if (Date.now() - intentos[ip].firstAttempt > 900000) {
    intentos[ip] = {
      count: 1,
      firstAttempt: Date.now()
    };
    return true;
  }
  
  intentos[ip].count++;
  
  if (intentos[ip].count > 5) {
    return false;
  }
  
  return true;
}

module.exports = checkIntentos;