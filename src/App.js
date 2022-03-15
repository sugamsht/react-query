import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import './App.css'
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import RQSuperHeroDetail from './components/RQSuperHeroDetail.page'
import ParallelQueries from './components/ParallelQueries.page'
import DynamicParallel from './components/DynamicParallel.page'
import PaginatedQueries from './components/PaginatedQueries.page'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path='/rq-paginated'>
              <PaginatedQueries />
            </Route>
            <Route path='/rq-dynamic-parallel'>
              <DynamicParallel heroIds={[1, 3]} />
            </Route>
            <Route path='/rq-parallel'>
              <ParallelQueries />
            </Route>
            <Route path='/rq-super-heros/:heroId'>
              <RQSuperHeroDetail />
            </Route>
            <Route path='/super-heroes'>
              <SuperHeroesPage />
            </Route>
            <Route path='/rq-super-heroes'>
              <RQSuperHeroesPage />
            </Route>
            <Route path='/'>
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  )
}

export default App
