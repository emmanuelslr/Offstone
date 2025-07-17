const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')

const client = createClient({
  projectId: 'ok0g8o46',
  dataset: 'production',
  useCdn: false,
  token: 'skMvkGVVb5wyKLuypSFMlIzzT0eHU9sOoJiAM6gr9ubacJC9fTETxzb2pqusCVSW1omS86HwREf2zQW9agZvNzRA1OQLsTNCenH3wRzVy43oKFlDThuwxuYXWu8ejDHbTKqywUTJn5B3Ug5v1d6MGFA3eSYzSDs4sPbrudxALDBk29Hbz7vy', // Ajoute ici ton token API Sanity si besoin
  apiVersion: '2023-07-01'
})

const dataPath = path.join(__dirname, 'static', 'navbar.json')
const navbarData = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

async function importNavbar() {
  const doc = {
    _type: 'navbar',
    logoSvg: navbarData.logoSvg,
    links: navbarData.links,
    buttons: navbarData.buttons
  }
  try {
    const res = await client.createOrReplace({ ...doc, _id: 'navbar-main' })
    console.log('Navbar imported:', res)
  } catch (err) {
    console.error('Import error:', err)
  }
}

importNavbar()
