import Image from 'next/image';
import Link from 'next/link';
import './page.css';

export default function Home() {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <nav className="main__nav">
            <div className="nav__logo">
              <Image
                width={113}
                height={17}
                className="logo__image"
                src="/img/logo.png"
                alt="logo"
                priority
              />
            </div>
            <div className="nav__burger">
              <span className="burger__line"></span>
              <span className="burger__line"></span>
              <span className="burger__line"></span>
            </div>
            <div className="nav__menu">
              <ul className="menu__list">
                <li className="menu__item">
                  <Link href="/" className="menu__link">
                    Главное
                  </Link>
                </li>
                <li className="menu__item">
                  <Link href="/playlist" className="menu__link">
                    Мой плейлист
                  </Link>
                </li>
                <li className="menu__item">
                  <Link href="/signin" className="menu__link">
                    Войти
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          
          <div className="centerblock">
            <div className="centerblock__search">
              <svg className="search__svg">
                <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
              </svg>
              <input
                className="search__text"
                type="search"
                placeholder="Поиск"
                name="search"
              />
            </div>
            <h2 className="centerblock__h2">Треки</h2>
            <div className="centerblock__filter">
              <div className="filter__title">Искать по:</div>
              <div className="filter__button">исполнителю</div>
              <div className="filter__button">году выпуска</div>
              <div className="filter__button">жанру</div>
            </div>
            <div className="centerblock__content">
              <div className="content__title">
                <div className="playlistTitle__col col01">Трек</div>
                <div className="playlistTitle__col col02">Исполнитель</div>
                <div className="playlistTitle__col col03">Альбом</div>
                <div className="playlistTitle__col col04">
                  <svg className="playlistTitle__svg">
                    <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
                  </svg>
                </div>
              </div>
              <div className="content__playlist">
                {/* Здесь будут твои треки из Playlist компонента */}
              </div>
            </div>
          </div>
          
          <div className="main__sidebar">
            <div className="sidebar__personal">
              <p className="sidebar__personalName">Sergey.Ivanov</p>
              <div className="sidebar__icon">
                <svg>
                  <use xlinkHref="/img/icon/sprite.svg#logout"></use>
                </svg>
              </div>
            </div>
            <div className="sidebar__block">
              <div className="sidebar__list">
                <div className="sidebar__item">
                  <Link href="/playlist/1" className="sidebar__link">
                    <Image
                      className="sidebar__img"
                      src="/img/playlist01.png"
                      alt="day's playlist"
                      width={250}
                      height={150}
                    />
                  </Link>
                </div>
                <div className="sidebar__item">
                  <Link href="/playlist/2" className="sidebar__link">
                    <Image
                      className="sidebar__img"
                      src="/img/playlist02.png"
                      alt="day's playlist"
                      width={250}
                      height={150}
                    />
                  </Link>
                </div>
                <div className="sidebar__item">
                  <Link href="/playlist/3" className="sidebar__link">
                    <Image
                      className="sidebar__img"
                      src="/img/playlist03.png"
                      alt="day's playlist"
                      width={250}
                      height={150}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <div className="bar">
          <div className="bar__content">
            <div className="bar__playerProgress"></div>
            <div className="bar__playerBlock">
              <div className="bar__player">
                <div className="player__controls">
                  <div className="player__btnPrev">
                    <svg className="player__btnPrevSvg">
                      <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                    </svg>
                  </div>
                  <div className="player__btnPlay btn">
                    <svg className="player__btnPlaySvg">
                      <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                    </svg>
                  </div>
                  <div className="player__btnNext">
                    <svg className="player__btnNextSvg">
                      <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                    </svg>
                  </div>
                  <div className="player__btnRepeat btnIcon">
                    <svg className="player__btnRepeatSvg">
                      <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                    </svg>
                  </div>
                  <div className="player__btnShuffle btnIcon">
                    <svg className="player__btnShuffleSvg">
                      <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                    </svg>
                  </div>
                </div>

                <div className="player__trackPlay">
                  <div className="trackPlay__contain">
                    <div className="trackPlay__image">
                      <svg className="trackPlay__svg">
                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                      </svg>
                    </div>
                    <div className="trackPlay__author">
                      <Link href="/artist/basta" className="trackPlay__authorLink">
                        Ты та...
                      </Link>
                    </div>
                    <div className="trackPlay__album">
                      <Link href="/album/basta" className="trackPlay__albumLink">
                        Баста
                      </Link>
                    </div>
                  </div>

                  <div className="trackPlay__likeDis">
                    <div className="trackPlay__like btnIcon">
                      <svg className="trackPlay__likeSvg">
                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                      </svg>
                    </div>
                    <div className="trackPlay__dislike btnIcon">
                      <svg className="trackPlay__dislikeSvg">
                        <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bar__volumeBlock">
                <div className="volume__content">
                  <div className="volume__image">
                    <svg className="volume__svg">
                      <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                    </svg>
                  </div>
                  <div className="volume__progress btn">
                    <input
                      className="volume__progressLine btn"
                      type="range"
                      name="range"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer"></footer>
      </div>
    </div>
  );
}