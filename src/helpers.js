export class Animal {
  constructor(nome, especie, ordemBrinquedos) {
    this.nome = nome
    this.especie = especie
    this.ordemBrinquedos = ordemBrinquedos
  }
}

export class Pessoa {
  constructor(nome, brinquedos, adotados) {
    this.nome = nome
    this.brinquedos = brinquedos
    this.adotados = adotados
  }
}

export function validaBrinquedos(brinquedos) {
  const brinquedosValidos = ['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE']
  let validos = brinquedos.every(brinquedo => brinquedosValidos.includes(brinquedo.nome))
  let unicos = new Set(brinquedos.map(b => b.nome)).size == brinquedos.length

  return (validos && unicos)
}

export function podeAdotar(pessoa, animal) {
  if (pessoa.adotados >= 3) return false

  const brinquedosAnimal = animal.ordemBrinquedos

  let brinquedosPessoa
  if (animal.especie === 'gato') {
    brinquedosPessoa = pessoa.brinquedos.filter(b => !b.usado).map(b => b.nome)
  } else {
    brinquedosPessoa = pessoa.brinquedos.map(b => b.nome)
  }

  if (animal.nome === 'Loco') {
    return brinquedosAnimal.every(brinquedo => brinquedosPessoa.includes(brinquedo));
  }

  let indexBrinquedoAnimal = 0
  for (let i = 0; i < brinquedosPessoa.length; i++) {
    if (brinquedosPessoa[i] == brinquedosAnimal[indexBrinquedoAnimal]) {
      indexBrinquedoAnimal++
    }
    if (indexBrinquedoAnimal === brinquedosAnimal.length) return true
  }
  return false
}

export function adotaAnimal(pessoa, animal) {
  pessoa.adotados++
  if (animal.especie === 'gato') {
    animal.ordemBrinquedos.forEach(brinquedoNome => {
      pessoa.brinquedos = pessoa.brinquedos.filter(br => br.nome !== brinquedoNome)
    })
  } else {
    animal.ordemBrinquedos.forEach(brinquedoNome => {
      const brinquedo = pessoa.brinquedos.find(br => br.nome === brinquedoNome)
      if (brinquedo) brinquedo.usado = true
    })
  }
}