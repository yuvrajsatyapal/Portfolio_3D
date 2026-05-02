export interface Tag {
  label: string
  color?: string
}

export interface Project {
  slug:        string
  title:       string
  subtitle:    string
  description: string
  tags:        Tag[]
  image:       string
  liveUrl?:    string
  githubUrl?:  string
  year:        number
  featured?:   boolean
  color?:      string   // accent colour for the detail page
}

export interface Skill {
  name:     string
  level:    number      // 0-100
  category: 'frontend' | 'backend' | 'design' | 'tools'
  color:    string      // hex
}