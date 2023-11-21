export const hungarianTextMap = {
    columnMenuUnsort: "Rendezés vége",
    columnMenuSortAsc: "Rendezd növekvő",
    columnMenuSortDesc: "Rendezd csökkenő",
    columnMenuFilter: "Szűr",
    filterOperatorContains: 'Tartalmaz',
    filterOperatorEquals: 'Egyenlő',
    filterOperatorStartsWith: 'Kezdődik vele',
    filterOperatorEndsWith: 'Végződik vele',
    filterOperatorIsEmpty: 'Üres',
    filterOperatorIsNotEmpty: 'Nem üres',
    filterOperatorIsAnyOf: 'Bármelyik',
    filterPanelOperator: 'Operátor',
    filterPanelColumns: 'Oszlop',
    filterPanelInputLabel: 'Érték',
    filterPanelInputPlaceholder: 'Szűrési érték',
    footerRowSelected: (count) =>
    count !== 1
    ? `${count.toLocaleString()} sor választva`
    : `${count.toLocaleString()} sor választva`,
};