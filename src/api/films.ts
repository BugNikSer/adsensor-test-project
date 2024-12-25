export interface IFilm {
  id: number
  name: string
}

const mock: IFilm[] = [
  {
    "id": 1,
    "name": "The Matrix"
  },
  {
    "id": 2,
    "name": "Inception"
  },
  {
    "id": 3,
    "name": "Interstellar"
  },
  {
    "id": 4,
    "name": "The Dark Knight"
  },
  {
    "id": 5,
    "name": "Pulp Fiction"
  }
]

export const getAll = async (): Promise<IFilm[]> => {
  return new Promise((resolve, reject) => {
    const random = Math.random() * 10
    setTimeout(() => {
      if (random > 1) {
        resolve(mock)
      } else {
        reject('error')
      }
    })
  })
}

export const getByIdList = async ({ idList }: { idList: number[] }): Promise<IFilm[]> => {
  return new Promise((resolve, reject) => {
    const random = Math.random() * 10
    setTimeout(() => {
      if (random > 1) {
        resolve(mock.filter(film => idList.includes(film.id)))
      } else {
        reject('error')
      }
    })
  })
}
