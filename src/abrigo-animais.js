import { Animal, validaBrinquedos, Pessoa, podeAdotar, adotaAnimal } from './helpers'

class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    if (typeof brinquedosPessoa1 !== 'string' || typeof brinquedosPessoa2 !== 'string') return { erro: 'Brinquedo inválido' }
    if (typeof ordemAnimais !== 'string') return { erro: 'Animal inválido' }
    let lista = []
    let brinquedosP1 = brinquedosPessoa1.split(',').map(brinquedo => ({nome: brinquedo, usado: false}))
    let brinquedosP2 = brinquedosPessoa2.split(',').map(brinquedo => ({nome: brinquedo, usado: false}))
    let pessoa1 = new Pessoa('pessoa 1', brinquedosP1, 0)
    let pessoa2 = new Pessoa('pessoa 2', brinquedosP2, 0)

    const animais = ordemAnimais.split(',')

    const animaisValidos = [
      new Animal('Rex', 'cao', ['RATO', 'BOLA']),
      new Animal('Mimi', 'gato', ['BOLA', 'LASER']),
      new Animal('Fofo', 'gato', ['BOLA', 'RATO', 'LASER']),
      new Animal('Zero', 'gato', ['RATO', 'BOLA']),
      new Animal('Bola', 'cao', ['CAIXA', 'NOVELO']),
      new Animal('Bebe', 'cao', ['LASER', 'RATO', 'BOLA']),
      new Animal('Loco', 'jabuti', ['SKATE', 'RATO'])
    ]

    let nomesAnimaisValidos = animaisValidos.map(a => a.nome)
    const animaisSaoValidos = animais.every(animal => nomesAnimaisValidos.includes(animal))
    const animaisSaoUnicos = new Set(animais).size == animais.length
    if (!animaisSaoValidos || !animaisSaoUnicos) {
      return { erro: 'Animal inválido' }
    }

    if (!validaBrinquedos(brinquedosP1) || !validaBrinquedos(brinquedosP2)) {
      return { erro: 'Brinquedo inválido' }
    }

    for (const nomeAnimal of animais) {
      if (nomeAnimal === 'Loco' && animais.length === 1) {
        lista.push('Loco - abrigo')
        continue
      }

      const animal = animaisValidos.find(animal => animal.nome == nomeAnimal)

      const pessoa1pode = podeAdotar(pessoa1, animal)
      const pessoa2pode = podeAdotar(pessoa2, animal)

      let destino = 'abrigo'

      if (pessoa1pode && pessoa2pode) {
        lista.push(`${nomeAnimal} - abrigo`)
        continue
      } else if (pessoa1pode) {
        adotaAnimal(pessoa1, animal)
        destino = 'pessoa 1'
      } else if (pessoa2pode) {
        adotaAnimal(pessoa2, animal)
        destino = 'pessoa 2'
      }
      lista.push(`${nomeAnimal} - ${destino}`)
    }
    lista.sort()
    return { lista }
  }
}


export { AbrigoAnimais as AbrigoAnimais };
