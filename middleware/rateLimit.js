// Control simple de intentos
const intentos = {};

function checkIntentos(ip) {
  // Si no existe, crear contador
  if (!intentos[ip]) {
    intentos[ip] = {
      count: 1,
      firstAttempt: Date.now()
    };
    return true;
  }
  
  // Reset después de 15 minutos
  if (Date.now() - intentos[ip].firstAttempt > 900000) {
    intentos[ip] = {
      count: 1,
      firstAttempt: Date.now()
    };
    return true;
  }
  
  // Incrementar contador
  intentos[ip].count++;
  
  // Bloquear después de 5 intentos
  if (intentos[ip].count > 5) {
    return false;
  }
  
  return true;
}

module.exports = checkIntentos;