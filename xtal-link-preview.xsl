<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="/">
        <xsl:apply-templates select="div/header"/>
    </xsl:template>

    <xsl:template match="header">
        <xsl:variable name="href" select="@href"/>
        <xsl:variable name="imgSrc">
            <xsl:call-template name="getImage"></xsl:call-template>
        </xsl:variable>
        <xsl:variable name="fullyQualifiedImgSrc">
            <xsl:call-template name="makeFullyQualified">
                <xsl:with-param name="imageSrc" select="$imgSrc"/>
                <xsl:with-param name="href" select="$href"/>
            </xsl:call-template>
        </xsl:variable>
        <main part="main">
            <xsl:attribute name="be-verbose">
                {
                    "on":{
                        "":{
                            "dipatch": "rendered"
                        }
                    }
                }
            </xsl:attribute>
            <h1 itemprop="title" part="title"><xsl:value-of select="title"/></h1>
            <h2 itemprop="description" part="description"><xsl:value-of select="meta-ish[@name='description']/@content"/></h2>
            <a itemprop="href" part="link" href="{$href}" target="_blank">
            <xsl:if test="string-length($fullyQualifiedImgSrc) &gt; 5">
                <img part="image" alt="logo" src="{$fullyQualifiedImgSrc}"/>
            </xsl:if>
            </a>
        </main>
    </xsl:template>

    

    <xsl:template name="getImage">
        <xsl:choose>
            <xsl:when test="meta-ish[@property='og:image']">
                <xsl:value-of select="meta-ish[@property='og:image']/@content"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:choose>
                    <xsl:when test="meta-ish[@property='twitter:image']">
                        <xsl:value-of select="meta-ish[@property='twitter:image']/@content"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:choose>
                            <xsl:when test="//img">
                                <xsl:value-of select="//img[1]/@src"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:choose>
                                    <xsl:when test="link-ish[contains(@rel,'icon')]">
                                        <xsl:value-of select="link-ish[contains(@rel,'icon')][1]/@href"/>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        https://unpkg.com/xtal-link-preview/link_black_24dp.svg
                                    </xsl:otherwise>
                                </xsl:choose>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:otherwise>               
                </xsl:choose>
                
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template name="makeFullyQualified">
        <xsl:param name="imageSrc"/>
        <xsl:param name="href"/>
        <xsl:choose>
            <xsl:when test="starts-with($imageSrc,'/')">
                <xsl:variable name="postProcol" select="substring-after($href, '//')"/>
                <xsl:variable name="domain">
                    <xsl:choose>
                        <xsl:when test="contains($postProcol, '/')">
                            <xsl:value-of select="substring-before($postProcol, '/')"/>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:value-of select="$postProcol"/>
                        </xsl:otherwise>
                    </xsl:choose>
                </xsl:variable>
                https://<xsl:value-of select="$domain"/><xsl:value-of select="$imageSrc"/>
            </xsl:when>
            <xsl:when test="starts-with($imageSrc, '../')">
                <xsl:call-template name="makeFullyQualified">
                    <xsl:with-param name="imageSrc" select="substring-after($imageSrc, '../')"/>
                    <xsl:with-param name="href">
                        <xsl:call-template name="substring-before-last">
                            <xsl:with-param name="string1" select="$href"/>
                            <xsl:with-param name="string2">/</xsl:with-param>
                        </xsl:call-template>
                    </xsl:with-param>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="contains($imageSrc, '//')">
                <xsl:value-of select="$imageSrc"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$href"/>/<xsl:value-of select="$imageSrc"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template name="substring-before-last">
        <xsl:param name="string1" select="''" />
        <xsl:param name="string2" select="''" />

        <xsl:if test="$string1 != '' and $string2 != ''">
            <xsl:variable name="head" select="substring-before($string1, $string2)" />
            <xsl:variable name="tail" select="substring-after($string1, $string2)" />
            <xsl:value-of select="$head" />
            <xsl:if test="contains($tail, $string2)">
            <xsl:value-of select="$string2" />
            <xsl:call-template name="substring-before-last">
                <xsl:with-param name="string1" select="$tail" />
                <xsl:with-param name="string2" select="$string2" />
            </xsl:call-template>
            </xsl:if>
        </xsl:if>
    </xsl:template>
    
</xsl:stylesheet>