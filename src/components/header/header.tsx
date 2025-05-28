import { HeaderComponent } from "./components/headerComponent"

type HeaderProps = {
  title: string
  subtitle: string
}

export const Header = (props: HeaderProps) => {
  return (
    <>
      <HeaderComponent title={props.title} subtitle={props.subtitle} />
    </>
  )
}