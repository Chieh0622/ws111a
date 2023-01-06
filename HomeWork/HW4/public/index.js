async function sqlRun() {
    let cmd = document.getElementById('cmd').value
    let resultJson = document.getElementById('resultJson')
    let r = await window.fetch(`/sqlcmd/${cmd}`)
    let obj = await r.json()
    resultJson.innerText = JSON.stringify(obj, null, 2)
}
