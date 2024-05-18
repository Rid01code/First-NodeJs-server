var btn = document.getElementsByClassName("Button")

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    const clr =   color += letters[Math.floor(Math.random() * 16)];
    color += letters[Math.floor(Math.random() * 16)];
      console.log(clr)
  }
  return color;
}

let tgl = () => {
  let Text = document.getElementsByClassName("Heading")
  Text.style.color = getRandomColor()
}