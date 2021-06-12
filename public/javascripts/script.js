const tape = document.querySelector('.tape')

if (tape !== null) {
  tape.addEventListener('click', event => {
    if (event.target.classList.contains('del-btn')) {
      const targetId = event.target.dataset.id

      $('#del-btn-link').attr("action", `/todos/${targetId}?_method=DELETE`)
      $('#del-btn-link').attr("method", "POST")
      $('#deleteWarningModal').modal('show')
    }
  })
}