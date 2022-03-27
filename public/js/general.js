$(function() {
  
  function confirmarSalir() {
    Swal.fire({
        title: '¿Desea salir de Magistral Store Online?',
        icon: 'warning',
        confirmButtonColor: '#3F84FC',
        cancelButtonColor: '#FC413F',
        showCancelButton: true,
        confirmButtonText: 'Salir',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {   
            window.location = '/logout'                          
        }
    })
  }   

  $('#logout').on('click', function() {
      confirmarSalir()
  })

  // Regresar atras
  function back() {
    window.history.back()
  }
})