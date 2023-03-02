import React from 'react'
import '../styles/UserStyles/UserFooter.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function UserFooter() {
  return (
    <div>
        <footer className='footer'>
            <div className='container'>
                <div className='row'>
                    <div className='footer-col'>
                        <h4>company</h4>
                        <ul>
                            <li><a href='#'>About us</a></li>
                            <li><a href='#'>Our services</a></li>
                            <li><a href='#'>Privacy policy</a></li>
                            <li><a href='#'>Affiliate program</a></li>
                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h4>Resources</h4>
                        <ul>
                            <li><a href='#'>Blog</a></li>
                            <li><a href='#'>eBook</a></li>
                            <li><a href='#'>Customer Reviews</a></li>
                            <li><a href='#'>Partners</a></li>
                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h4>Get Help</h4>
                        <ul>
                            <li><a href='#'>FAQ</a></li>
                            <li><a href='#'>Services</a></li>
                            <li><a href='#'>Customer care</a></li>
                            <li><a href='#'>Complaints</a></li>
                        </ul>
                    </div>
                    <div className='footer-col'>
                        <h4>follow us</h4>
                        <div className='social-links'>
                            <a href='#'><FacebookIcon/></a>
                            <a href='#'><InstagramIcon/></a>
                            <a href='#'><YouTubeIcon/></a>
                            <a href='#'><TwitterIcon/></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
  )
}
