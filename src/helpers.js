export class Animal {
  constructor(nome, especie, ordemBrinquedos) {
    this.nome = nome
    this.especie = especie
    this.ordemBrinquedos = ordemBrinquedos
  }
}

export class Pessoa {
  constructor(brinquedos, adotados) {
    this.brinquedos = brinquedos
    this.adotados = adotados
  }
}

const brinquedosValidos = ['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE']

export function brinquedosValidosEUnicos(brinquedos) {
  let validos = brinquedos.every(brinquedo => brinquedosValidos.includes(brinquedo))
  let unicos = new Set(brinquedos).size == brinquedos.length

  return validos && unicos
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

