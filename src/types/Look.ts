export interface Look {
    name: string
    color?: string
    outputStyles: { [outputId: string]: string } // outputId -> Output Style id
    index?: number
}
