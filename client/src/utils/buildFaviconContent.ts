export const buildFaviconContent = (stepToUse: number, gamePhase: string) => {
  let fillColor = "black"
  if (gamePhase === "Win") {
    fillColor = "green"
  } else if (gamePhase === "Lose") {
    fillColor = "red"
  }

  // gallows
  let faviconContent = `
    <svg width="180" height="210" viewBox="0 0 180 210" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 200H50V210H60V200Z" fill="black"/>
    <path d="M52 190H42V200H52V190Z" fill="black"/>
    <path d="M45 180H35V190H45V180Z" fill="black"/>
    <path d="M52 20H42V30H52V20Z" fill="black"/>
    <path d="M60 10H50V20H60V10Z" fill="black"/>
    <path d="M45 30H35V40H45V30Z" fill="black"/>
    <path d="M35 10H25V210H35V10Z" fill="black"/>
    <path d="M135 0H25V10H135V0Z" fill="black"/>
    <path d="M135 10H125V20H135V10Z" fill="black"/>
    <path d="M10 200H0V210H10V200Z" fill="black"/>
    <path d="M18 190H8V200H18V190Z" fill="black"/>
    <path d="M25 180H15V190H25V180Z" fill="black"/>
  `

  const incrementalSVG: Record<number, string> = {
    // head
    1: `
      <path d="M125 25H115V35H125V25Z" fill="${fillColor}"/>
      <path d="M140 55H120V65H140V55Z" fill="${fillColor}"/>
      <path d="M145 45H135V55H145V45Z" fill="${fillColor}"/>
      <path d="M123 45H113V55H123V45Z" fill="${fillColor}"/>
      <path d="M150 35H140V45H150V35Z" fill="${fillColor}"/>
      <path d="M120 35H110V45H120V35Z" fill="${fillColor}"/>
      <path d="M145 25H135V35H145V25Z" fill="${fillColor}"/>
      <path d="M135 20H125V30H135V20Z" fill="${fillColor}"/>
    `,
    // body
    2: `
      <path d="M145 65H115V75H145V65Z" fill="${fillColor}"/>
      <path d="M155 70H145V130H155V70Z" fill="${fillColor}"/>
      <path d="M145 125H115V135H145V125Z" fill="${fillColor}"/>
      <path d="M116 70H106V130H116V70Z" fill="${fillColor}"/>
    `,
    // left arm
    3:
      gamePhase === "Win"
        ? `
      <path d="M90 40H80V50H90V40Z" fill="${fillColor}"/>
      <path d="M95 50H85V60H95V50Z" fill="${fillColor}"/>
      <path d="M100 60H90V70H100V60Z" fill="${fillColor}"/>
      <path d="M106 70H96V80H106V70Z" fill="${fillColor}"/>
    `
        : `
      <path d="M91 100H81V110H91V100Z" fill="${fillColor}"/>
      <path d="M96 90H86V100H96V90Z" fill="${fillColor}"/>
      <path d="M101 80H91V90H101V80Z" fill="${fillColor}"/>
      <path d="M106 70H96V80H106V70Z" fill="${fillColor}"/>
    `,
    // right arm
    4:
      gamePhase === "Win"
        ? `
      <path d="M175 50H165V60H175V50Z" fill="${fillColor}"/>
      <path d="M180 40H170V50H180V40Z" fill="${fillColor}"/>
      <path d="M170 60H160V70H170V60Z" fill="${fillColor}"/>
      <path d="M165 70H155V80H165V70Z" fill="${fillColor}"/>
    `
        : `
      <path d="M175 90H165V100H175V90Z" fill="${fillColor}"/>
      <path d="M180 100H170V110H180V100Z" fill="${fillColor}"/>
      <path d="M170 80H160V90H170V80Z" fill="${fillColor}"/>
      <path d="M165 70H155V80H165V70Z" fill="${fillColor}"/>
    `,
    // left leg
    5: `
      <path d="M105 165H95V175H105V165Z" fill="${fillColor}"/>
      <path d="M110 155H100V165H110V155Z" fill="${fillColor}"/>
      <path d="M115 145H105V155H115V145Z" fill="${fillColor}"/>
      <path d="M120 135H110V145H120V135Z" fill="${fillColor}"/>
    `,
    // right leg
    6: `
      <path d="M165 165H155V175H165V165Z" fill="${fillColor}"/>
      <path d="M160 155H150V165H160V155Z" fill="${fillColor}"/>
      <path d="M155 145H145V155H155V145Z" fill="${fillColor}"/>
      <path d="M150 135H140V145H150V135Z" fill="${fillColor}"/>
    `,
    // left foot
    7: `
      <path d="M100 175H90V185H100V175Z" fill="${fillColor}"/>
      <path d="M90 175H80V185H90V175Z" fill="${fillColor}"/>
    `,
    // right foot
    8: `
      <path d="M170 175H160V185H170V175Z" fill="${fillColor}"/>
      <path d="M180 175H170V185H180V175Z" fill="${fillColor}"/>
    `,
  }

  for (let step = 1; step <= stepToUse; step++) {
    faviconContent += incrementalSVG[step] || ""
  }

  faviconContent += "</svg>"

  return faviconContent
}
