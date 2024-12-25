export interface ISubCategory {
  id: number
  name: string
  filmIds: number[]
}
export interface ICategory {
  id: number
  name: string
  subCategories: ISubCategory[]
}

const mock: ICategory[] = [
  {
    "id": 1,
    "name": "Action",
    "subCategories": [
      {
        "id": 101,
        "name": "Sci-Fi",
        "filmIds": [1, 2, 3]
      },
      {
        "id": 102,
        "name": "Superheroes",
        "filmIds": [1, 2, 4]
      }
    ]
  },
  {
    "id": 2,
    "name": "Drama",
    "subCategories": [
      {
        "id": 201,
        "name": "Historical",
        "filmIds": [1, 3, 5]
      },
      {
        "id": 202,
        "name": "Romance",
        "filmIds": [2, 3, 5]
      }
    ]
  }
]

export const getAll = async (): Promise<ICategory[]> => {
  return new Promise((resolve, reject) => {
    const random = Math.random() * 10
    setTimeout(() => {
      if (random > 1) {
        resolve(mock)
      } else {
        reject('error')
      }
    }, 1000)
  })
}
