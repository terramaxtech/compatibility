import { InvocationContext } from "@azure/functions";
import { fetchExperiments } from "../fetchData/fetchExperiments";
import { fetchExpUnits } from "../fetchData/fetchExpUnits";
import { composedExperiment, Experiment } from "../dataModels/experiment";
import { Author, ExpAuthor } from "../dataModels/listItems";
import { fetchExpAuthors } from "../fetchData/fetchExpAuthors";
import { fetchUnitClients } from "../fetchData/fetchUnitClients";
import { composedUnit, ExpUnit, UnitClient, UnitInternals } from "../dataModels/unit";
import { fetchUnitInternals } from "../fetchData/fetchUnitInternals";
import { ComposedUnitExternal, UnitExternal, UnitExternalComponent, UnitExternalsManufacturer } from "../dataModels/externals";
import { fetchUnitExternals } from "../fetchData/fetchUnitExternals";
import { fetchUnitExternalsManufacturers } from "../fetchData/fetchUnitExternalsManufacturers";
import { fetchUnitExternalsComponents } from "../fetchData/fetchUnitExternalsComponents";


export async function composeExperiments(context: InvocationContext) {
    try {
        const [experiments, authors, expUnits, unitClients, unitInternals, unitExternals, unitExternalsManufacturers, unitExternalsComponents] = 
            await Promise.all([fetchExperiments(context), fetchExpAuthors(context), fetchExpUnits(context), fetchUnitClients(context), fetchUnitInternals(context),
                fetchUnitExternals(context), fetchUnitExternalsManufacturers(context), fetchUnitExternalsComponents(context)
            ]);

        //const experiments: Experiment[] = await fetchExperiments(context);
        //const authors: ExpAuthor[] = await fetchExpAuthors(context);
        //const expUnits: ExpUnit[] = await fetchExpUnits(context);
        //const unitClients: UnitClient[] = await fetchUnitClients(context);
        //const unitInternals: UnitInternals[] = await fetchUnitInternals(context);
        //const unitExternals: UnitExternal[] = await fetchUnitExternals(context);
        //const unitExternalsManufacturers: UnitExternalsManufacturer[] = await fetchUnitExternalsManufacturers(context);
        //const unitExternalsComponents: UnitExternalComponent[] = await fetchUnitExternalsComponents(context);


        const composedExperiments: composedExperiment[] = experiments.map((exp) => {
            const composedExperiment: composedExperiment = {
                experiment: exp,
                authors: authors.filter(a => a.exp_num === exp.num).map((auth) => {
                    const author: Author = {
                        code: auth.author_code,
                        first_name: auth.first_name,
                        last_name: auth.last_name 
                    }
                    return author;
                }),
                units: expUnits.filter(u => u.exp_num === exp.num).map((unit) => {
                    const thisUnit: composedUnit = {
                        unit: unit,
                        clients: unitClients.filter(c => c.unit_num === unit.unit_num).map(c => c.client_name),
                        internals: unitInternals.filter(i => i.unit_num === unit.unit_num).map(internal => {
                            const unitInteral: UnitInternals = { 
                                code: internal.code,
                                internal_name: internal.internal_name,
                                unit_num: internal.unit_num,
                                applicaiton_rate: internal.applicaiton_rate
                            }
                            return unitInteral;
                        }),
                        externals: unitExternals.filter(e => e.unit_num === unit.unit_num).map(external => {
                            const composedExternal: ComposedUnitExternal = {
                                unit_external: external,
                                manufacturers: unitExternalsManufacturers.filter(m => m.unit_external_code === external.code).map(m => m.manufacturer_name),
                                components: unitExternalsComponents.filter(c => c.unit_external_code === external.code).map(component => {
                                    const unitExternalsComponent: UnitExternalComponent = {
                                        id: component.id,
                                        component_name: component.component_name,
                                        unit_external_code: component.unit_external_code,
                                        min_percent: component.min_percent,
                                        max_percent: component.max_percent,
                                        other_qty: component.other_qty
                                    }
                                    return unitExternalsComponent;
                                })
                            }
                            return composedExternal;
                        })
                    }
                    return thisUnit;
                })
            } 

            return composedExperiment;
        });

        return composedExperiments;


    } catch (err) {
        context.log("composeExperiments error:", err);
        throw err;
    }
}