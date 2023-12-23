const url = document.getElementById("url"), shortenedUrlText = document.querySelector('.shortener-url'),
    shortenUrlButton = document.getElementById('shorten-btn'), reloadButton = document.getElementById('reload')    

window.onload = () => {
    resetElements()
}

/* Verifica si el enlace ingresado es valido y lo genera para poder copiarlo */
const shortenUrl = () => {  
    setTimeout(() => {
        fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url.value)}`)
        .then(res => { return res.status == 400 || res.status == 404 ? shortenedUrlText.textContent = 'El URL que ingresaste no es válido!!' : res.text(); })
        .then(data => {
            let textColor = data.includes('válido') || data.includes('Error') ? '#F25F5C' : '#247BA0'
            shortenedUrlText.textContent = data
            shortenedUrlText.style.color = textColor
        })
        .catch(error => { console.log('INFO: ', error) });
        
    }, 2500, shortenedUrlText.textContent = `Procesando... \u{f252}`);  
    
}
shortenUrlButton.addEventListener('click', () => { 
    shortenedUrlText.style.color = '#50514F'
    url.value != '' ? shortenUrl() : (shortenedUrlText.textContent = 'No has ingresado ningún URL...', url.focus())
})

reloadButton.addEventListener('click', () => { resetElements() })

/* Copia el texto y modifica el texto del botón una vez seleccionado */
const copyUrl = document.getElementById('copy-url')
copyUrl.addEventListener('click', () => {
    copyUrl.textContent = `Copiado correctamente | \u{f00c}`
    navigator.clipboard.writeText(shortenedUrlText.textContent)
    setTimeout(() => { copyUrl.textContent = `Copiar | \u{f24d}` }, 2800);    
})

const resetElements = () => {
    url.value = shortenedUrlText.textContent = ''
    shortenedUrlText.style.color = '#50514F'
}