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
            <h1 itemprop="title" part="title"><xsl:value-of select="title"/></h1>
            <h2 itemprop="description" part="description"><xsl:value-of select="meta-ish[@name='description']/@content"/></h2>
            <a itemprop="href" part="link" href="{$href}" target="_blank"><xsl:value-of select="$href"/></a>
            <img alt="logo" src="{$fullyQualifiedImgSrc}"/>
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
            <xsl:otherwise>
                <xsl:value-of select="$imageSrc"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
</xsl:stylesheet>