import { Author } from "./listItems"
import { composedUnit } from "./unit"

export type Experiment = {
    num: string,
    start_date: string,
    notebook: string,
    notes: string | undefined,
}

export type composedExperiment = {
    experiment: Experiment,
    authors: Author[],
    units: composedUnit[]
}
