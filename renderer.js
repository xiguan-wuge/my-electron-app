const information = document.getElementById('info')
if(information) {
  information.innerText = `This app is using:
  Chrome (v${window.versions.chrome()}), 
  Node.js (v${window.versions.node()}), 
  Electron (v${window.versions.electron()})`
}

const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // 打印 'pong'
}

func()