import create from 'zustand';

const useStore = create(set => ({
    bears: 0,
    increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
    decreasePopulation: () => set(state => ({ bears: state.bears - 1 }))
}));

export function BearCounter() {
    const bears = useStore(state => state.bears);
    return(bears);
}

export function IncreaseBears() {
    const increasePopulation = useStore(state => state.increasePopulation);

    return <button onClick={increasePopulation} className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">increase population</button>
}

export function DecreaseBears() {
    const increasePopulation = useStore(state => state.decreasePopulation);

    return <button onClick={increasePopulation} className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">increase population</button>
}