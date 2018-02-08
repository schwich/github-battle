import React from 'react';
import PropTypes from 'prop-types';

import { fetchPopularRepos } from '../utils/api';

import Loading from './Loading';

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired,
}

function RepoGrid({ repos }) {
    return (
        <ul className='popular-list'>
            {repos.map((repo, index) => {
                const { name, owner, stargazers_count, html_url } = repo;
                return (
                    <li key={name} className='popular-item'>
                        <div className='popular-rank'>#{index + 1}</div>\
                        <ul className='space-list-items'>
                            <li>
                                <img
                                    className='avatar'
                                    src={owner.avatar_url}
                                    alt={'Avatar for ' + owner.login} />
                            </li>
                            <li><a href={html_url}>{name}</a></li>
                            <li>@{owner.login}</li>
                            <li>{stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

function SelectLanguage(props) {
    const languages = ['All', 'JavaScript', 'ruby', 'Java', 'CSS', 'Python'];
    let { selectedLanguage, onSelect } = props;
    return (
        <ul className='languages'>
            {languages.map((lang) => {
                return (
                    <li
                        style={lang === selectedLanguage ? { color: '#d0021b' } : null}
                        onClick={() => onSelect(lang)}
                        key={lang}>
                        {lang}
                    </li>
                )
            })}
        </ul>
    );
}

class Popular extends React.Component {

    state = {
        selectedLanguage: 'All',
        repos: null
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage = async (lang) => {
        this.setState({
            selectedLanguage: lang,
            repos: null
        });

        // fetchPopularRepos(lang)
        //     .then((repos) => this.setState({ repos }))

        const repos = await fetchPopularRepos(lang);
        this.setState(() => ({ repos }));
    }

    render() {
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage} />
                {!this.state.repos
                    ? <Loading />
                    : <RepoGrid repos={this.state.repos} />}
            </div>
        );
    }
}

export default Popular;