export class Goal {
  id
  image
  title

  constructor (id, title) {
    this.id = id
    this.image = this.makeImage(title)
    this.title = title
  }

  makeImage (title) {
    switch (title) {
      case 'No Poverty': {
        return require('@/assets/SDG-Icons/E-WEB-Goal-01.png')
      }
      case 'Zero Hunger': {
        return require('@/assets/SDG-Icons/E-WEB-Goal-02.png')
      }
      case 'Good Health and Well Being': {
        return require('@/assets/SDG-Icons/E-WEB-Goal-03.png')
      }
      case 'Quality Education': {
        return require('@/assets/SDG-Icons/E-WEB-Goal-04.png')
      }
      case 'Gender Equality': {
        return require('@/assets/SDG-Icons/E-WEB-Goal-05.png')
      }
      case 'Clean Water and Sanitation': {
        return require('@/assets/SDG-Icons/E-WEB-Goal-06.png')
      }
      case 'Affordable and Clean Energy': {
        return require('@/assets/SDG-Icons/E-WEB-Goal-07.png')
      }
      case 'Decent Work and Economic Growth': {
        return require('@/assets/SDG-Icons/E-WEB-Goal-08.png')
      }
      case 'Industry, Innovation, and Infrastructure': {
        return require('@/assets/SDG-Icons/E-WEB-Goal-09.png')
      }
      case 'Reduced Inequality': {
        return require('@/assets/SDG-Icons/E-WEB-Goal-10.png')
      }
      case 'Sustainable Cities and Communities': {
        return require('@/assets/SDG-Icons/E-WEB-Goal-11.png')
      }
      case 'Responsible Consumption and Production': {
        return require('@/assets/SDG-Icons/E-WEB-Goal-12.png')
      }
      case 'Climate Action': {
        return require('@/assets/SDG-Icons/E-WEB-Goal-13.png')
      }
      case 'Life Below Water': {
        return require('@/assets/SDG-Icons/E-WEB-Goal-14.png')
      }
      case 'Life on Land': {
        return require('@/assets/SDG-Icons/E-WEB-Goal-15.png')
      }
      case 'Peace, Justice, and Strong Institutions': {
        return require('@/assets/SDG-Icons/E-WEB-Goal-16.png')
      }
      case 'Partnerships for the Goals': {
        return require('@/assets/SDG-Icons/E-WEB-Goal-17.png')
      }
      default: {
        console.error('Image cannot be found for goal: ' + title)
        return require('@/assets/img/logos/logo.png')
      }
    }
  }
}
