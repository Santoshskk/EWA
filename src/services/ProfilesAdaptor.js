import { Profile } from '@/models/profile'

export class ProfilesAdaptor {
  resourcesUrl

  constructor (resourcesUrl) {
    this.resourcesUrl = resourcesUrl
    console.log(resourcesUrl)
  }

  async fetchJson (url, options = null) {
    try {
      console.log(url, options)
      const response = await fetch(url, options)
      console.log(response)
      if (response.ok) {
        return await response.json()
      } else {
        console.log(response, !response.bodyUsed ? await response.text() : '')
        return null
      }
    } catch (error) {
      console.error('Error during fetch:', error)
      return null
    }
  }

  async asyncFindAll () {
    console.log('ProfilesAdaptor.asyncFindAll()...')
    const profilesData = await this.fetchJson(this.resourcesUrl)
    console.log('profilesData: ', profilesData)
    return profilesData
  }

  async asyncFindById (id) {
    console.log('ProfilesAdaptor.asyncFindById(' + id + ')...')
    const profilesData = await this.fetchJson(this.resourcesUrl + '/' + id)
    return Profile.copyConstructor(profilesData)
  }

  async asyncSave (profile) {
    console.log('ProfilesAdaptor.asyncSave(profile)...')
    console.log(this.resourcesUrl)

    try {
      const response = await this.fetchJson(this.resourcesUrl + '/' + profile.user_id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      })

      console.log(response)
      return Profile.copyConstructor(response)
    } catch (error) {
      console.error('Error during fetch:', error)
      return null
    }
  }

  async asyncDeleteById (id) {
    console.log('ProfilesAdaptor.asyncDeleteById(' + id + ')...')
    const response = this.fetchJson(this.resourcesUrl + '/' + id,
      {
        method: 'DELETE'
      })
    if (response && response.status === 204) {
      console.log('Profile deleted succesfully.')
      return true
    } else {
      console.log('Error deleting profile: ', response)
      return false
    }
  }
}
