const url = document.getElementById("url"), shortenedUrlText = document.querySelector('.shortener-url'),
    shortenUrlButton = document.getElementById('shorten-btn'), reloadButton = document.getElementById('reload')

//* API KEY expuesta intencionalmente, para uso exclusivo en este proyecto y mostrarlo en mi portafolio **
const DEMO_KEY = 'Vuhg9RRV4UWgkvNZgAVeDnijJTVo8dMLMOq9XZ4F4ok60xDzFFT0NCnp7aSM'    

window.onload = () => {
    resetElements()
}

/* Verifica si el enlace ingresado es valido y lo genera para poder copiarlo */
const shortenUrl = async () => {
  shortenedUrlText.textContent = 'Procesando...'
  shortenedUrlText.style.color = '#999'

  try {
    const res = await fetch('https://api.tinyurl.com/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEMO_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url.value
      })
    });

    const data = await res.json()

    if (!res.ok) {
      shortenedUrlText.textContent = 'El URL no es válido'
      shortenedUrlText.style.color = '#F25F5C'
      return
    }

    shortenedUrlText.textContent = data.data.tiny_url
    shortenedUrlText.style.color = '#247BA0'

  } catch (err) {
    console.error(err)
    shortenedUrlText.textContent = 'Error de red'
    shortenedUrlText.style.color = '#F25F5C'
  }
};

shortenUrlButton.addEventListener('click', () => { 
    shortenedUrlText.style.color = '#50514F'
    url.value != '' ? shortenUrl() : (shortenedUrlText.textContent = 'No has ingresado ningún URL', url.focus())
})

reloadButton.addEventListener('click', () => { resetElements() })

/* Copia el texto y modifica el texto del botón una vez seleccionado */
const copyUrl = document.getElementById('copy-url')
copyUrl.addEventListener('click', () => {
  if(shortenedUrlText.textContent != '' && url.value != '') {
    copyUrl.textContent = `Copiado correctamente | \u{f14a}`
    navigator.clipboard.writeText(shortenedUrlText.textContent)
    setTimeout(() => { copyUrl.textContent = `Copiar | \u{f24d}` }, 2800); 
  }       
})

const resetElements = () => {
    url.value = shortenedUrlText.textContent = ''
    shortenedUrlText.style.color = '#50514F'
}