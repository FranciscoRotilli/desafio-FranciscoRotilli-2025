import { Animal, brinquedosValidosEUnicos, Pessoa, podeAdotar } from './helpers'

class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    let lista = []
    let brinquedosP1 = brinquedosPessoa1.split(',').map(brinquedo => ({nome: brinquedo, usado: false}))
    let brinquedosP2 = brinquedosPessoa2.split(',').map(brinquedo => ({nome: brinquedo, usado: false}))
    let pessoa1 = new Pessoa(brinquedosP1, 0)
    let pessoa2 = new Pessoa(brinquedosP2, 0)

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

    let nomesAnimaisValidos = []

    animaisValidos.forEach(animal => {
      nomesAnimaisValidos.push(animal.nome)
    });

    const animaisSaoValidos = animais.every(animal => nomesAnimaisValidos.includes(animal))
    const animaisSaoUnicos = new Set(animais).size == animais.length

    if (!animaisSaoValidos || !animaisSaoUnicos) {
      return { erro: 'Animal inválido' }
    }

    const nomesBrinquedosP1 = brinquedosP1.map(b => b.nome)
    const nomesBrinquedosP2 = brinquedosP2.map(b => b.nome)

    if (!brinquedosValidosEUnicos(nomesBrinquedosP1) || !brinquedosValidosEUnicos(nomesBrinquedosP2)) {
      return { erro: 'Brinquedo inválido' }
    }

    for (const nomeAnimal of animais) {
      if (nomeAnimal === 'Loco' && animais.length === 1) {
        lista.push(`${nomeAnimal} - abrigo`)
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
        destino = 'pessoa 1'
        pessoa1.adotados++
        if (animal.especie === 'gato') {
          animal.ordemBrinquedos.forEach(brinquedoNome => {
            pessoa1.brinquedos = pessoa1.brinquedos.filter(br => br.nome !== brinquedoNome)
          })
        } else {
          animal.ordemBrinquedos.forEach(brinquedoNome => {
            const brinquedo = pessoa1.brinquedos.find(br => br.nome === brinquedoNome)
            if (brinquedo) brinquedo.usado = true
          })
        }
      } else if (pessoa2pode) {
        destino = 'pessoa 2'
        pessoa2.adotados++
        if (animal.especie === 'gato') {
          animal.ordemBrinquedos.forEach(brinquedoNome => {
            pessoa2.brinquedos = pessoa2.brinquedos.filter(br => br.nome !== brinquedoNome)
          })
        } else {
          animal.ordemBrinquedos.forEach(brinquedoNome => {
            const brinquedo = pessoa2.brinquedos.find(br => br.nome === brinquedoNome)
            if (brinquedo) brinquedo.usado = true
          })
        }
      }
      lista.push(`${nomeAnimal} - ${destino}`)
    }
    lista.sort()
    return { lista }
  }
}


export { AbrigoAnimais as AbrigoAnimais };
