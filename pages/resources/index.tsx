import Layout from '../../components/Layout'
import styles from './Resources.module.scss'

function Resources() {
    return (
        <Layout>
            <div className={styles.main}>
                <h1 className={styles.title}>Resources</h1>
                <div className={styles.cards}>
                    <OfficialZenon />
                    <ZenonCommunity />
                    <DevLinks />
                </div>
            </div>
        </Layout>
    )
}

function OfficialZenon() {
    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <div className={styles.cardHeaderLeft}>
                        <h1 className={styles.cardTitle}>Official Zenon Network</h1>
                    </div>
                </div>
                <ul className={styles.linksList}>
                    <li><a className={styles.link} href="https://www.zenon.network">Website</a></li>
                    <li><a className={styles.link} href="https://twitter.com/Zenon_Network">Twitter</a></li>
                    <li><a className={styles.link} href="https://t.me/joinchat/MLyPehLIbJj1nw1XOOOltg">Telegram</a></li>
                    <li><a className={styles.link} href="https://discord.gg/XDDjECy">Discord</a></li>
                    <li><a className={styles.link} href="https://github.com/zenon-network">Github</a></li>
                    <li><a className={styles.link} href="https://bitcointalk.org/index.php?topic=5279643.msg55303681#msg55303681">Bitcoin Talk</a></li>
                    <li><a className={styles.link} href="https://medium.com/@zenon.network">Medium</a></li>
                    <li><a className={styles.link} href="https://www.youtube.com/channel/UCDb8ZtqBt6l5l4HugCnJwhQ">Youtube</a></li>
                </ul>
            </div>
        </div>
    )
}

function ZenonCommunity() {
    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <div className={styles.cardHeaderLeft}>
                        <h1 className={styles.cardTitle}>Zenon Community</h1>
                    </div>
                </div>
                <ul className={styles.linksList}>
                    <li><a className={styles.link} href="https://discord.gg/CK8RpWKD">Zenon Community Discord</a></li>
                    <li><a className={styles.link} href="https://t.me/Zenon_Community">Zenon Community Telegram (English)</a></li>
                    <li><a className={styles.link} href="https://t.me/ZenonFR">Zenon Community Telegram (French)</a></li>
                    <li><a className={styles.link} href="https://t.me/Zenonnetwork_Ru">Zenon Community Telegram (Russian)</a></li>
                    <li><a className={styles.link} href="https://t.me/ZenonNL">Zenon Community Telegram (Netherlands)</a></li>
                    <li><a className={styles.link} href="https://t.me/zenonnetwork_ind">Zenon Community Telegram (Indonesian)</a></li>
                    <li><a className={styles.link} href="https://t.me/Zenon_Spanish_Community">Zenon Community Telegram (Spanish)</a></li>
                    <li><a className={styles.link} href="https://t.me/zenon_arabic_community">Zenon Community Telegram (Arabic)</a></li>
                </ul>
            </div>
        </div>
    )
}

function DevLinks() {
    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                    <div className={styles.cardHeaderLeft}>
                        <h1 className={styles.cardTitle}>Useful Tools/Links</h1>
                    </div>
                </div>
                <ul className={styles.linksList}>
                    <li><a className={styles.link} href="https://docs.zenon.wiki/home/">The Zenon Wiki</a></li>
                    <li><a className={styles.link} href="https://github.com/zenon-network/znn-wiki">go-zenon Official Documentation</a></li>
                    <li><a className={styles.link} href="https://github.com/zenon-network/znn-wiki/blob/master/api.md">go-zenon Official JSON-RPC API Documentaiton</a></li>
                    <li><a className={styles.link} href="https://github.com/zenon-network/znn-wiki/blob/master/deploy.md">go-zenon Official Node Deployment Tutorial</a></li>
                    <li><a className={styles.link} href="https://github.com/alien-valley/znn.js">Alien Valley Javascript SDK</a></li>
                    <li><a className={styles.link} href="http://alien-valley.io/who-to-delegate.html">Alien Valley Pillar Tracker</a></li>
                    <li><a className={styles.link} href="https://www.zenon.tools/">zenon.tools - Rewards Calculator, Pillar Tracker</a></li>
                    <li><a className={styles.link} href="https://t.me/pillar_tracker">Zenon Tools Telegram Pillar Tracker</a></li>
                </ul>
            </div>

        </div>
    )
}

export default Resources